import React from 'react';

export function LockSwitch (props: any) {
    switch(props.private) {
        case 'free':
            return <i className="fa fa-lock-open enable"></i>;
        case 'subscription':
            return <i className="fa fa-user-lock enable"></i>;
        case 'pay':
        default: return null;
    }
}
