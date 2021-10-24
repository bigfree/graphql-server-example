import { registerEnumType } from "type-graphql";

export enum OrderEnum {
    ASC = "ASC",
    DESC = "DESC",
}

/**
 * Order enum
 */
registerEnumType(OrderEnum, {
    name: "Orders",
    description: 'Order values in table'
});