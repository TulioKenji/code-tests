import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest){
    const authenticatedPaths = ["/main"];

    const path = request.nextUrl.pathname;

    if(!request.cookies.has("username") && authenticatedPaths.includes(path)){ 
        return NextResponse.redirect(new URL('/', request.url));
    }


    NextResponse.next();
}