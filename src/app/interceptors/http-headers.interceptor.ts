import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Key':'e811bb7b75msh49386ea1f2f041cp1296b9jsnd13aae6487b8',
                'X-RapidAPI-Host':'rawg-video-games-database.p.rapidapi.com',
            },
            setParams: {
                key: '9787269acbc64139a307708df797c2a0',
            }
        });
        return next.handle(req);
    }

}

