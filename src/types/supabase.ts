export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string;
          track_id: string;
          author: string;
          content: string;
          created_at: string;
          likes: number;
        };
        Insert: {
          id?: string;
          track_id: string;
          author: string;
          content: string;
          created_at?: string;
          likes?: number;
        };
        Update: {
          id?: string;
          track_id?: string;
          author?: string;
          content?: string;
          created_at?: string;
          likes?: number;
        };
      };
    };
  };
}