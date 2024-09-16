import { Injectable } from '@nestjs/common';
import {
  DynamoDB,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { AwsService } from '@app/aws/aws.service';

/**
 * Service for interacting with DynamoDB.
 */
@Injectable()
export class DynamodbService {
  /**
   * Creates an instance of DynamodbService.
   * @param awsService - The service used to provide AWS configurations.
   */
  constructor(private readonly awsService: AwsService) {}

  /**
   * Returns an instance of DynamoDB client.
   * @returns The DynamoDB client instance.
   */
  public get client(): DynamoDB {
    return new DynamoDB(this.awsService.client);
  }

  /**
   * Retrieves an item from the DynamoDB table based on the provided key.
   * @param tableName - The name of the DynamoDB table.
   * @param key - The primary key of the item to retrieve.
   * @returns The retrieved item from DynamoDB.
   */
  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: key,
    });

    try {
      const response = await this.client.send(command);
      return response.Item;
    } catch (error) {
      console.error('Error getting item from DynamoDB', error);
      throw error;
    }
  }

  /**
   * Puts an item into the DynamoDB table.
   * @param tableName - The name of the DynamoDB table.
   * @param item - The item to be added to the DynamoDB table.
   * @returns The result of the put operation.
   */
  async putItem(tableName: string, item: Record<string, any>): Promise<any> {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error putting item to DynamoDB', error);
      throw error;
    }
  }

  /**
   * Scans and retrieves items from the DynamoDB table with optional pagination.
   * @param tableName - The name of the DynamoDB table.
   * @param limit - The maximum number of items to return.
   * @param lastEvaluatedKey - The key to start the scan from for pagination (optional).
   * @returns An object containing the list of items and the last evaluated key.
   */
  async scanItems(
    tableName: string,
    limit: number,
    lastEvaluatedKey?: Record<string, any>,
  ): Promise<{ items: any[]; lastEvaluatedKey?: Record<string, any> }> {
    const params: ScanCommandInput = {
      TableName: tableName,
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    const command = new ScanCommand(params);

    try {
      const response = await this.client.send(command);
      return { items: response.Items, lastEvaluatedKey: response.LastEvaluatedKey };
    } catch (error) {
      console.error('Error scanning items from DynamoDB', error);
      throw error;
    }
  }
}
