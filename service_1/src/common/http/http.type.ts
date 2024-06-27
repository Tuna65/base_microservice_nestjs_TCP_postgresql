export interface BodyCreateWallet {
  id?: string;
  ownerId: string;
  type: string;
  balance: number;
  ownerName: string;
}
