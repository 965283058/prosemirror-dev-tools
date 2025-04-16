import React, { MouseEventHandler } from "react";
declare const Heading: React.FC<React.PropsWithChildren>;
declare const HeadingWithButton: React.FC<React.PropsWithChildren>;
declare const HeadingButton: React.FC<{
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}>;
export { Heading, HeadingWithButton, HeadingButton };
