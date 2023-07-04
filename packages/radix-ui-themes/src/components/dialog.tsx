'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Heading } from './heading';
import { Text } from './text';
import { Theme } from '../theme';

interface DialogRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'modal'> {}
const DialogRoot = (props: DialogRootProps) => <DialogPrimitive.Root {...props} modal />;
DialogRoot.displayName = 'DialogRoot';

type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>;
interface DialogTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>, 'asChild'> {}
const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  (props, forwardedRef) => <DialogPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
DialogTrigger.displayName = 'DialogTrigger';

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface DialogContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild'> {
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container'];
}
const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  (props, forwardedRef) => {
    const { className, forceMount, container, ...contentProps } = props;
    return (
      <DialogPrimitive.Portal container={container} forceMount={forceMount}>
        <Theme asChild applyBackgroundColor={false}>
          <DialogPrimitive.Overlay className="rui-DialogOverlay">
            <DialogPrimitive.Content
              {...contentProps}
              ref={forwardedRef}
              className={classNames('rui-DialogContent', className)}
            />
          </DialogPrimitive.Overlay>
        </Theme>
      </DialogPrimitive.Portal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

type DialogTitleElement = React.ElementRef<typeof Heading>;
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof Heading>;
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title asChild>
      <Heading size="4" trim="start" {...props} ref={forwardedRef} />
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionElement = HTMLParagraphElement;
type DialogDescriptionProps = Omit<React.ComponentPropsWithoutRef<typeof Text>, 'asChild'>;
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Description asChild>
      <Text as="p" size="2" {...props} ref={forwardedRef} />
    </DialogPrimitive.Description>
  )
);
DialogDescription.displayName = 'DialogDescription';

type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Close>;
interface DialogCloseProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'asChild'> {}
const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  (props, forwardedRef) => <DialogPrimitive.Close {...props} ref={forwardedRef} asChild />
);
DialogClose.displayName = 'DialogClose';

const Dialog = Object.assign(
  {},
  {
    Root: DialogRoot,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
  }
);

export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
