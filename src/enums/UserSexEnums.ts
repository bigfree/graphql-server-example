import { registerEnumType } from "type-graphql";

export enum UserSex {
    MALE = "male",
    FEMALE = "female",
    INTERSEX = "intersex",
}

registerEnumType(UserSex, {
    name: "UserSex",
    description: 'Gender of the user',
    valuesConfig: {
        FEMALE: {
            description: "Female gender user"
        },
        MALE: {
            description: "Male gender user"
        },
        INTERSEX: {
            description: "Intersex gender user"
        }
    }
});