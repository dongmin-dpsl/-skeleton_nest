import { IsNotEmpty, MaxLength, NotEquals } from "class-validator";

export class CreatePostDto {
    @NotEquals(null)
    @IsNotEmpty()
    @MaxLength(500)
    title: string;

    @NotEquals(null)
    @IsNotEmpty()
    content: string;

    @NotEquals(null)
    @IsNotEmpty()
    @MaxLength(5)
    writter: string;

}
