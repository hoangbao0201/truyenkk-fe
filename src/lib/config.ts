export const API_BASE_URL = process.env.NODE_ENV == "production"
? process.env.NEXT_PUBLIC_API_BASE_URL
: "http://localhost:4000";

export const MAIN_BASE_URL = process.env.NODE_ENV == "production"
? process.env.NEXT_PUBLIC_MAIN_BASE_URL
: "http://localhost:3000";