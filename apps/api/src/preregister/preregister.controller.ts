import { CreatePreRegisterDto } from '@api/preregister/dtos/CreatePreRegister.dto';
import { UpdatePreRegisterDto } from '@api/preregister/dtos/UpdatePreRegister.dto';
import { PreregisterService } from '@api/preregister/preregister.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse } from '@app/database';
import { PreRegisterEntity } from '@app/database/entities/PreRegister.entity';
import { IsEmailPipe } from '@app/shared';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('preregister')
@ApiTags('Preregister')
export class PreregisterController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly preregisterService: PreregisterService) {}

  /**
   * Creates a new pre-registration.
   * @param data - The data for the pre-registration.
   * @returns A promise that resolves to void.
   */
  @Post()
  @Public()
  async createPreRegister(
    @Body() data: CreatePreRegisterDto,
  ): Promise<PreRegisterEntity> {
    return await this.preregisterService.createPreRegister(data);
  }

  /**
   * Retrieves all pre-registers with pagination.
   * @param limit - The maximum number of pre-registers to retrieve per page. Default is 10.
   * @param page - The page number of pre-registers to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response of pre-registers.
   */
  @Get('many')
  @Admin()
  async getAllPreRegisters(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PreRegisterEntity>> {
    return await this.preregisterService.getAllPreRegisters(limit, page);
  }

  /**
   * Retrieves a pre-register by its email.
   * @param email - The email of the pre-register to retrieve.
   * @returns A promise that resolves to the pre-register.
   */
  @Get()
  @Admin()
  async getPreRegisterByEmail(
    @Query('email', IsEmailPipe) email: string,
  ): Promise<PreRegisterEntity> {
    return await this.preregisterService.getPreRegisterByEmail(email);
  }

  /**
   * Updates a pre-register entry.
   * @param data The data to update the pre-register entry with.
   * @returns The updated pre-register entry.
   */
  @Put()
  @Admin()
  async updatePreRegister(
    @Body() data: UpdatePreRegisterDto,
  ): Promise<PreRegisterEntity> {
    return await this.preregisterService.updatePreRegister(data);
  }

  /**
   * Deletes a pre-registered user by email.
   * @param email - The email of the pre-registered user to delete.
   * @returns A promise that resolves to the result of the deletion operation.
   */
  @Delete()
  @Admin()
  async deletePreRegister(@Query('email', IsEmailPipe) email: string): Promise<void> {
    return await this.preregisterService.deletePreRegister(email);
  }
}
