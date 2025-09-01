import BaseScenario from "../../../base/base-scenario";


export default interface RegularMemberScenario extends BaseScenario {

    createdRegularMember(): Promise<void>;

    searchRegularMember(valueMember: string): Promise<void>;

    cancelSearchRegularMember(valueMember: string): Promise<void>;

    shortingAscRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void>;

    shortingDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void>;

    shortingAscAndDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email", value: string): Promise<void>;

    memberPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;

    inputFormMemberName(memberName: string): Promise<void>;
}