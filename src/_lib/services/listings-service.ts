import { apiService } from '@/_lib/services/api-service';
import { IListing, ListingsResponse, UpdatedListingResponse } from '@/_utils/types/types';

class ListingsService {
  private readonly axiosInstance = apiService.getInstance();
  
  getAll = async () => {
    try {
      const { status, data } = await this.axiosInstance.get<ListingsResponse>('/api/published');
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  
  getAllSecured = async (token: string) => {
    apiService.setToken(token)
    try {
      const { status, data } = await this.axiosInstance.get<ListingsResponse>('/api/listings');
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  deleteOneById = async (id: string, token?: string) => {
    apiService.setToken(token)
    try {
      const { data, status } = await this.axiosInstance.delete(`/api/listings/${id}`);
      return { data, status };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  create = async (listing: object, token?: string) => {
    apiService.setToken(token)
    try {
      const { data, status } = await this.axiosInstance.post<IListing>('/api/listings', listing)
      return { data, status }
    }
    catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  getOneById = async (token?: string, id?: string) => {
    apiService.setToken(token);
    try {
      const { status, data } = await this.axiosInstance.get<ListingsResponse>(`/api/listings/${id}`);
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  updateOneById = async (_id: string, listing: object, token?: string) => {
    apiService.setToken(token);
    try {
      const { data, status } = await this.axiosInstance.put<UpdatedListingResponse>('/api/listings', { _id, listing });
      return { data, status };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
  publish = async (id: string, daysLeft: number, token?: string) => {
    apiService.setToken(token);
    try {
      const { data, status } = await this.axiosInstance.put<UpdatedListingResponse>(`/api/listings/${id}`, {daysLeft});
      return { data, status };
    } catch (error) {
      return apiService.handleAxiosError(error)
    }
  }
}

export const listingsService = new ListingsService()