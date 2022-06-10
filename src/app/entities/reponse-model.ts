import { MiaPagination } from "@agencycoda/mia-core";
import { Client } from "./client";

export interface ResponseModel {
    susuccess: boolean;
    response: MiaPagination<Client>;
}