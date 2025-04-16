import React from "react";
export declare const SplitView: React.FC<{
    testId?: string;
    children: React.ReactNode;
}>;
type SplitViewColProps = {
    grow?: boolean;
    maxWidth?: number;
    minWidth?: number;
    noPaddings?: boolean;
    sep?: boolean;
    children: React.ReactNode;
};
export declare const SplitViewCol: React.FC<SplitViewColProps>;
export {};
