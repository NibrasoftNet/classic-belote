import { BidType, SuitType } from '@/types/card';
import { PlayerType } from '@/types/player';

export class BiddingService {
  private static instance: BiddingService;
  
  private readonly VALID_BIDS = [90, 100, 110, 120, 130, 140, 150, 160, 260, 500];
  private readonly BID_NAMES = {
    260: 'Capot',
    500: 'General'
  };

  private constructor() {}

  public static getInstance(): BiddingService {
    if (!BiddingService.instance) {
      BiddingService.instance = new BiddingService();
    }
    return BiddingService.instance;
  }

  public getValidBids(currentBid: number | null): number[] {
    if (!currentBid) return this.VALID_BIDS;
    return this.VALID_BIDS.filter(bid => bid > currentBid);
  }

  public getBidName(value: number): string {
    return this.BID_NAMES[value as keyof typeof this.BID_NAMES] || value.toString();
  }

  public isValidBid(bid: number, currentBid: number | null): boolean {
    if (!this.VALID_BIDS.includes(bid)) return false;
    if (!currentBid) return true;
    return bid > currentBid;
  }

  public getNextPlayer(currentPlayer: PlayerType): PlayerType {
    const order: PlayerType[] = ['south', 'west', 'north', 'east'];
    const currentIndex = order.indexOf(currentPlayer);
    return order[(currentIndex + 1) % 4];
  }

  public canBid(
    player: PlayerType,
    currentBidder: PlayerType | null,
    passedPlayers: PlayerType[]
  ): boolean {
    if (passedPlayers.includes(player)) return false;
    if (!currentBidder) return true;
    return player === this.getNextPlayer(currentBidder);
  }

  public isBiddingComplete(
    bids: BidType[],
    passedPlayers: PlayerType[]
  ): boolean {
    // Bidding is complete when either:
    // 1. All players have passed except one
    // 2. After a bid, the next three players pass
    if (passedPlayers.length === 3) return true;
    
    if (bids.length === 0) return false;
    
    const lastBid = bids[bids.length - 1];
    const subsequentPasses = passedPlayers.filter(player => 
      this.getPlayerOrder(player) > this.getPlayerOrder(lastBid.player)
    ).length;
    
    return subsequentPasses === 3;
  }

  private getPlayerOrder(player: PlayerType): number {
    const order: PlayerType[] = ['south', 'west', 'north', 'east'];
    return order.indexOf(player);
  }

  public getWinningBid(bids: BidType[]): BidType | null {
    if (bids.length === 0) return null;
    return bids.reduce((highest, current) => 
      current.value > highest.value ? current : highest
    );
  }

  public getBidStatus(bid: BidType): 'normal' | 'capot' | 'general' {
    if (bid.value === 500) return 'general';
    if (bid.value === 260) return 'capot';
    return 'normal';
  }
}

export const biddingService = BiddingService.getInstance();
