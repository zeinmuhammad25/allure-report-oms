import BaseScenario from "../../../../base/base-scenario";

export default interface PromotionListToolsScenario extends BaseScenario {

    selectPromoCategoryFilter(category: "ALL PROMOTIONS" | "TODAY'S PROMOTIONS"): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    searchPromotionList(promotion: string): Promise<void>;

    dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number>;

    shortingAscDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void>;

    shortingDescDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void>;

    shortingAscAndDescDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status", value: string): Promise<void>;

    setStatus(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void>;

    clearFilter(): Promise<void>;

    showDropDown(): Promise<void>;

    promotionListFormPagination(type: "previous" | "next"): Promise<void>;

}