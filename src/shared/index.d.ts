/**
 * Shared types and constants — geenius-ui
 *
 * Framework-agnostic types used by both React and Solid components.
 */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'destructive';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger' | 'destructive' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon' | 'default';
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'destructive' | 'info' | 'outline' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type InputSize = 'sm' | 'md' | 'lg';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';
export type VariantClasses<T extends string> = Record<T, string>;
export type DataAlignment = 'left' | 'center' | 'right';
export declare const ANIMATION_DURATION: {
    readonly fast: 150;
    readonly normal: 200;
    readonly slow: 300;
};
export declare const ANIMATION_EASING: {
    readonly easeOut: "cubic-bezier(0.16, 1, 0.3, 1)";
    readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
    readonly default: "ease-out";
};
export declare const Z_INDEX: {
    readonly dropdown: 50;
    readonly sticky: 100;
    readonly overlay: 200;
    readonly modal: 300;
    readonly popover: 400;
    readonly tooltip: 500;
    readonly priority: 9999;
};
export declare const hoverColors: {
    readonly muted: "hover:bg-muted";
    readonly primary: "hover:bg-primary/10 hover:text-primary";
    readonly destructive: "hover:bg-destructive/10 hover:text-destructive";
    readonly ghost: "hover:bg-surface";
    readonly surface: "hover:bg-muted/50";
};
export declare const borderRadius: {
    readonly default: "rounded-lg";
    readonly full: "rounded-full";
    readonly sm: "rounded-md";
};
export declare const transitions: {
    readonly hover: "transition-colors duration-150 ease-out";
    readonly overlay: "transition-all duration-200";
    readonly collapse: "transition-all duration-200 ease-out";
};
export declare const overlayAnimationClasses: {
    readonly fromTop: {
        readonly base: "origin-top";
        readonly enter: "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2";
        readonly exit: "animate-out fade-out-0 zoom-out-95 slide-out-to-top-2";
    };
    readonly fromBottom: {
        readonly base: "origin-bottom";
        readonly enter: "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2";
        readonly exit: "animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2";
    };
    readonly center: {
        readonly base: "origin-center";
        readonly enter: "animate-in fade-in-0 zoom-in-95";
        readonly exit: "animate-out fade-out-0 zoom-out-95";
    };
    readonly fade: {
        readonly base: "";
        readonly enter: "animate-in fade-in-0";
        readonly exit: "animate-out fade-out-0";
    };
};
export type OverlayAnimationType = keyof typeof overlayAnimationClasses;
//# sourceMappingURL=index.d.ts.map