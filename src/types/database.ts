declare global {
  namespace DB {
    export interface Database {
      save: (item: any) => any;

      update: (item: any) => any;

      delete: (id: string) => any;

      get: (id: string) => any;

      getAll: () => any[];
    }
  }
}

export {};
