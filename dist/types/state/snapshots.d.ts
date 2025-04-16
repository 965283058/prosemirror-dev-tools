type SnapshotReducerAction = {
    type: "save";
    payload: {
        snapshot: Snapshot;
    };
} | {
    type: "delete";
    payload: {
        snapshot: Snapshot;
    };
};
export type Snapshot = {
    name: string;
    timestamp: number;
    snapshot: any;
};
export declare function useSnapshots(): [Snapshot[], (action: SnapshotReducerAction) => void];
export {};
