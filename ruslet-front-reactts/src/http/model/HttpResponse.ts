export interface IHttpResponse<T> extends IEmptyHttpResponse {
    data?: T
}

export interface IEmptyHttpResponse {
    errors: Map<string, string>
    title: string
    status: number
}