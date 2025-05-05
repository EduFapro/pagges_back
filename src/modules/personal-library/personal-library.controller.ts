import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { UserTokenInfo } from 'src/decorators/user-info.decorator';
import { JwtPayload } from 'src/interfaces/user-info.interface';
import { PersonalLibraryService } from './personal-library.service';

export enum BookshelfState {
  TO_BE_READ = 'TO_BE_READ',
  READING = 'READING',
  READ = 'READ',
}

@Controller('personal-library')
export class PersonalLibraryController {
  constructor(
    private readonly personalLibrary: PersonalLibraryService
  ) {}

  @Put('addBook/:bookId')
  addBookToList(@UserTokenInfo() userInfo: JwtPayload, @Param('bookId') bookId: number, @Body() listToAdd: { state: BookshelfState }) {
    return this.personalLibrary.addBookToList(userInfo.id, bookId, listToAdd.state)
  }


  @Delete('removeBook/:bookId')
  removeBookFromList(@UserTokenInfo() userInfo: JwtPayload, @Param('bookId') bookId: number) {
    return this.personalLibrary.removeBookFromList(userInfo.id, bookId)
  }

  @Get('getBooksArray/:listName')
  getBooksArray(@UserTokenInfo() userInfo: JwtPayload, @Param('listName') listName: BookshelfState) {
    const state: BookshelfState = listName as BookshelfState;
    return this.personalLibrary.getBooksArray(userInfo.id, state)
  }

  @Get('getUserStatistics')
  getUserStatistics(@UserTokenInfo() userInfo: JwtPayload) {
    return this.personalLibrary.getUserStatistics(userInfo.id)
  }
}
