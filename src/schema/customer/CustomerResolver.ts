import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../../entities/customer/Customer";
import { CustomerArgs } from "../../arguments/customer/customerArgs";
import { CreateCustomerInput } from "../../inputs/customer/CreateCustomerInput";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UpdateCustomerInput } from "../../inputs/customer/UpdateCustomerInput";

@Resolver(() => Customer)
export class CustomerResolver {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {
    }

    /**
     * Get one customer
     * @param customerArgs
     */
    @Query(() => Customer, { nullable: true })
    async customer(@Args() customerArgs: CustomerArgs): Promise<Customer> {
        return await this.customerRepository.findOne({
            where: customerArgs
        });
    }

    /**
     * Get all customers
     */
    @Query(() => [Customer])
    async customers(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }

    /**
     * Create customer
     * @param data
     */
    @Mutation(() => Customer)
    async createCustomer(@Arg("data") data: CreateCustomerInput): Promise<Customer> {
        const customer = this.customerRepository.create(data);
        return await this.customerRepository.save(customer);
    }

    @Mutation(() => Customer)
    async updateCustomer(@Args() customerArgs: CustomerArgs, @Arg("data") data: UpdateCustomerInput): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: customerArgs
        });

        if (!customer) {
            throw new Error('Customer not found!');
        }

        this.customerRepository.merge(customer, data);
        return await this.customerRepository.save(customer);
    }

    /**
     * Delete customer
     * @param customerArgs
     */
    @Mutation(() => Customer)
    async deleteCustomer(@Args() customerArgs: CustomerArgs): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: customerArgs
        });

        if (!customer) {
            throw new Error('Customer not found!');
        }

        await this.customerRepository.delete(customerArgs);
        return customer;
    }
}