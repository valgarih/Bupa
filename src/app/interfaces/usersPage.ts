
export interface usersPage {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<Users>;
    ad: {
        company:string;
        url: string;
        text: string;
    };
}

export interface Users{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface jobUser {
    id?: number;
    name: string;
    job: string;
    updateAt?: string;
    createdAt?: string;
}
