import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { configEnv } from 'src/configs/env.config';
import { BodyCreateWallet } from './http.type';

@Injectable()
export class HttpServices {
  constructor(private readonly httpService: HttpService) {}

  async findShopByAlias(shopAlias: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(`${configEnv().apiUrl}/shop-alias?shopAlias=${shopAlias}`)
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async addUserToShop(userId: string, shopId: string, token: string) {
    const url = `${configEnv().apiUrl}/user-add-shop`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await this.httpService
        .put(
          url,
          { userId, shopId },
          {
            headers,
          },
        )
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error addUserToShop:', error);
      throw error;
    }
  }

  async createRoleDefault(businessId: string, token: string) {
    const url = `${configEnv().apiUrl}/role-default`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await this.httpService
        .post(url, { businessId }, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error createRoleDefault:', error);
      throw error;
    }
  }

  async addUserToBusiness(businessId: string, userId: String, token: string) {
    const url = `${configEnv().apiUrl}/user-add-business`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await this.httpService
        .patch(url, { businessId, userId }, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error addUserToShop:', error);
      throw error;
    }
  }

  async createWalletBusiness(body: BodyCreateWallet, token: string) {
    const url = `${configEnv().apiUrl}/wallet`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await this.httpService
        .post(url, body, {
          headers,
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error addUserToShop:', error);
      throw error;
    }
  }
}
