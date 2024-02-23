export interface IBook {
    Id: number;
    Name: string;
    Author: string;
    Genre: string;
    Rating: number;
    Description: string;
    LentByUserId:string;
    IsBookAvailable: boolean;
    CurrentlyBorrowedByUserId: string;
}
