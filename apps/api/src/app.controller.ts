import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  /**
   * Health Check
   * @returns success status
   */
  @Get()
  @ApiExcludeEndpoint()
  healthCheck(): { success: boolean } {
    return { success: true };
  }
}
