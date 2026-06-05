"use client";

import * as React from "react";

type Key = string | number;

type ComboBoxContextValue = {
  allowsCustomValue?: boolean;
  disabledKeys: Set<Key>;
  fullWidth?: boolean;
  highlightedKey: Key | null;
  inputValue: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isOpen: boolean;
  isRequired?: boolean;
  menuTrigger: "focus" | "input" | "manual";
  name?: string;
  registerItem: (key: Key, textValue: string) => void;
  selectItem: (key: Key, textValue: string) => void;
  selectedKey: Key | null;
  setHighlightedKey: (key: Key | null) => void;
  setInputValue: (value: string) => void;
  setOpen: (open: boolean) => void;
  shouldShowItem: (textValue: string) => boolean;
  unregisterItem: (key: Key) => void;
  variant?: "primary" | "secondary";
};

const ComboBoxContext = React.createContext<ComboBoxContextValue | null>(null);

function useComboBoxContext(component: string) {
  const context = React.useContext(ComboBoxContext);
  if (!context) throw new Error(`${component} must be used inside ComboBox`);
  return context;
}

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const styles = `
.combo-dark .combo-box { position:relative;display:flex;flex-direction:column;gap:.25rem;color:#fff;overflow:visible }
.combo-dark .combo-box--full-width { width:100% }
.combo-dark [data-slot="label"] { font-size:.75rem;font-weight:500;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.15em }
.combo-dark .combo-box__input-group { position:relative;isolation:isolate;display:inline-flex;align-items:center }
.combo-dark .combo-box__input-group--full-width { width:100% }
.combo-dark .combo-input {
  width:100%;min-width:0;flex:1 1 0%;border-radius:.75rem;border:1px solid rgba(255,255,255,.15);
  background:rgba(255,255,255,.06);color:#fff;outline:none;
  padding:.75rem 2.5rem .75rem 1rem;font-size:.875rem;line-height:1.25rem;
  transition:background-color 150ms ease,border-color 150ms ease,box-shadow 150ms ease;
}
.combo-dark .combo-input::placeholder { color:rgba(255,255,255,.3);opacity:1 }
.combo-dark .combo-input:focus { border-color:rgba(216,195,165,.5);background:rgba(255,255,255,.08);box-shadow:0 0 0 3px rgba(216,195,165,.12) }
.combo-dark .combo-input--full-width { width:100% }
.combo-dark .combo-box__trigger {
  position:absolute;inset-inline-end:0;top:50%;display:flex;height:100%;flex-shrink:0;
  transform:translateY(-50%);cursor:pointer;align-items:center;justify-content:center;
  border:0;background:transparent;color:rgba(255,255,255,.3);padding:0 .75rem 0 0;outline:none;
  transition:color 150ms ease;
}
.combo-dark .combo-box__trigger:hover { color:rgba(255,255,255,.7) }
.combo-dark .combo-box__trigger [data-slot="combo-box-trigger-default-icon"] { width:1rem;height:1rem;transition:transform 150ms ease }
.combo-dark .combo-box__trigger[data-open="true"] [data-slot="combo-box-trigger-default-icon"] { transform:rotate(180deg) }
.combo-dark .combo-box__popover {
  position:relative;width:100%;margin-top:.375rem;
  border-radius:1rem;background:#141414;border:1px solid rgba(255,255,255,.1);
  box-shadow:0 8px 24px rgba(0,0,0,.4);padding:.375rem;font-size:.875rem;
  animation:combo-in 120ms ease both;
}
@keyframes combo-in { from{opacity:0;transform:translateY(-4px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.combo-dark .list-box { display:flex;flex-direction:column;gap:.125rem;outline:none }
.combo-dark .list-box-item {
  display:flex;min-height:2.25rem;width:100%;cursor:pointer;align-items:center;
  gap:.5rem;border:0;border-radius:.625rem;background:transparent;color:rgba(255,255,255,.7);
  padding:.375rem .625rem;text-align:start;outline:none;font-size:.875rem;
  transition:background-color 120ms ease,color 120ms ease;
}
.combo-dark .list-box-item:hover,.combo-dark .list-box-item[data-highlighted="true"] { background:rgba(255,255,255,.07);color:#fff }
.combo-dark .list-box-item[data-selected="true"] { color:#D8C3A5 }
.combo-dark .list-box-item__indicator { margin-left:auto;opacity:0;color:#D8C3A5;transition:opacity 150ms ease }
.combo-dark .list-box-item__indicator[data-visible="true"] { opacity:1 }
`;

function ComboBoxStyles() {
  return <style>{styles}</style>;
}

type ComboBoxProps = {
  allowsCustomValue?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultFilter?: (textValue: string, inputValue: string) => boolean;
  defaultSelectedKey?: Key;
  disabledKeys?: Key[];
  fullWidth?: boolean;
  inputValue?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  menuTrigger?: "focus" | "input" | "manual";
  name?: string;
  onInputChange?: (value: string) => void;
  onSelectionChange?: (key: Key | null) => void;
  selectedKey?: Key | null;
  variant?: "primary" | "secondary";
};

function ComboBoxRoot({ allowsCustomValue, children, className, defaultFilter, defaultSelectedKey, disabledKeys = [], fullWidth, inputValue: controlledInputValue, isDisabled, isInvalid, isRequired, menuTrigger = "focus", name, onInputChange, onSelectionChange, selectedKey: controlledSelectedKey, variant }: ComboBoxProps) {
  const [isOpen, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(new Map<Key, string>());
  const [uncontrolledInputValue, setUncontrolledInputValue] = React.useState("");
  const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(defaultSelectedKey ?? null);
  const [highlightedKey, setHighlightedKey] = React.useState<Key | null>(null);

  const inputValue = controlledInputValue ?? uncontrolledInputValue;
  const selectedKey = controlledSelectedKey ?? uncontrolledSelectedKey;
  const disabledKeySet = React.useMemo(() => new Set<Key>(disabledKeys), [disabledKeys]);

  const setInputValue = React.useCallback((value: string) => {
    if (controlledInputValue === undefined) setUncontrolledInputValue(value);
    if (controlledSelectedKey === undefined && uncontrolledSelectedKey != null) {
      const selectedTextValue = items.get(uncontrolledSelectedKey);
      if (selectedTextValue !== value) { setUncontrolledSelectedKey(null); onSelectionChange?.(null); }
    }
    onInputChange?.(value);
  }, [controlledInputValue, controlledSelectedKey, items, onInputChange, onSelectionChange, uncontrolledSelectedKey]);

  const registerItem = React.useCallback((key: Key, textValue: string) => {
    setItems(cur => { const next = new Map(cur); next.set(key, textValue); return next; });
  }, []);

  const unregisterItem = React.useCallback((key: Key) => {
    setItems(cur => { const next = new Map(cur); next.delete(key); return next; });
  }, []);

  React.useEffect(() => {
    if (selectedKey == null) return;
    const textValue = items.get(selectedKey);
    if (textValue) setInputValue(textValue);
  }, [items, selectedKey, setInputValue]);

  const shouldShowItem = React.useCallback((textValue: string) => {
    if (!inputValue) return true;
    if (defaultFilter) return defaultFilter(textValue, inputValue);
    return textValue.toLowerCase().includes(inputValue.toLowerCase());
  }, [defaultFilter, inputValue]);

  const selectItem = React.useCallback((key: Key, textValue: string) => {
    if (disabledKeySet.has(key)) return;
    if (controlledSelectedKey === undefined) setUncontrolledSelectedKey(key);
    setInputValue(textValue);
    onSelectionChange?.(key);
    setOpen(false);
    setHighlightedKey(key);
  }, [controlledSelectedKey, disabledKeySet, onSelectionChange, setInputValue]);

  const value = React.useMemo<ComboBoxContextValue>(() => ({
    allowsCustomValue, disabledKeys: disabledKeySet, fullWidth, highlightedKey, inputValue,
    isDisabled, isInvalid, isOpen, isRequired, menuTrigger, name, registerItem, selectItem,
    selectedKey, setHighlightedKey, setInputValue, setOpen, shouldShowItem, unregisterItem, variant,
  }), [allowsCustomValue, disabledKeySet, fullWidth, highlightedKey, inputValue, isDisabled, isInvalid, isOpen, isRequired, menuTrigger, name, registerItem, selectItem, selectedKey, setInputValue, shouldShowItem, unregisterItem, variant]);

  return (
    <ComboBoxContext.Provider value={value}>
      <div className={cn("combo-dark")}>
        <ComboBoxStyles />
        <div aria-disabled={isDisabled || undefined} aria-invalid={isInvalid || undefined} className={cn("combo-box", fullWidth && "combo-box--full-width", className)} data-slot="combo-box">
          {children}
          <input name={name} required={isRequired} type="hidden" value={selectedKey ?? ""} />
        </div>
      </div>
    </ComboBoxContext.Provider>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & { fullWidth?: boolean; variant?: "primary" | "secondary" };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Input({ className, fullWidth, onKeyDown, placeholder, variant, ...props }: InputProps) {
  const context = useComboBoxContext("Input");
  function moveHighlight(delta: 1 | -1) {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-slot="list-box-item"]:not([hidden]):not([data-disabled="true"])'));
    if (!buttons.length) return;
    const currentIndex = buttons.findIndex(b => b.dataset.key === String(context.highlightedKey));
    const next = buttons[(currentIndex + delta + buttons.length) % buttons.length];
    context.setHighlightedKey(next.dataset.key ?? null);
    next.scrollIntoView({ block: "nearest" });
  }
  return (
    <input {...props} aria-autocomplete="list" aria-expanded={context.isOpen} aria-invalid={context.isInvalid || undefined} aria-required={context.isRequired || undefined}
      className={cn("combo-input", (fullWidth || context.fullWidth) && "combo-input--full-width", className)}
      data-disabled={context.isDisabled || undefined} data-slot="input" disabled={context.isDisabled}
      onChange={e => { context.setInputValue(e.currentTarget.value); if (context.menuTrigger !== "manual") context.setOpen(true); }}
      onFocus={e => { props.onFocus?.(e); if (context.menuTrigger === "focus") context.setOpen(true); }}
      onKeyDown={e => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown") { e.preventDefault(); context.setOpen(true); moveHighlight(1); }
        if (e.key === "ArrowUp") { e.preventDefault(); context.setOpen(true); moveHighlight(-1); }
        if (e.key === "Enter" && context.highlightedKey != null) {
          const item = document.querySelector<HTMLButtonElement>(`[data-slot="list-box-item"][data-key="${CSS.escape(String(context.highlightedKey))}"]`);
          if (item?.dataset.textValue) { e.preventDefault(); context.selectItem(context.highlightedKey, item.dataset.textValue); }
        }
        if (e.key === "Escape") context.setOpen(false);
      }}
      placeholder={placeholder} role="combobox" value={context.inputValue}
    />
  );
}

function ComboBoxInputGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = useComboBoxContext("ComboBox.InputGroup");
  return <div {...props} className={cn("combo-box__input-group", context.fullWidth && "combo-box__input-group--full-width", className)} data-slot="combo-box-input-group">{children}</div>;
}

function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return <svg aria-hidden fill="none" height={16} viewBox="0 0 16 16" width={16} xmlns="http://www.w3.org/2000/svg" {...props}><path clipRule="evenodd" d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06" fill="currentColor" fillRule="evenodd" /></svg>;
}

function ComboBoxTrigger({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useComboBoxContext("ComboBox.Trigger");
  return (
    <button {...props} aria-label={props["aria-label"] ?? "Toggle"} className={cn("combo-box__trigger", className)} data-disabled={context.isDisabled || undefined} data-open={context.isOpen || undefined} data-slot="combo-box-trigger" disabled={context.isDisabled}
      onClick={e => { onClick?.(e); if (!e.defaultPrevented) context.setOpen(!context.isOpen); }} type="button">
      {children ?? <IconChevronDown data-slot="combo-box-trigger-default-icon" />}
    </button>
  );
}

function ComboBoxPopover({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = useComboBoxContext("ComboBox.Popover");
  if (!context.isOpen) return null;
  return <div {...props} className={cn("combo-box__popover", className)} data-slot="combo-box-popover" role="presentation">{children}</div>;
}

function ListBoxRoot({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("list-box", className)} data-slot="list-box" role="listbox">{children}</div>;
}

type ListBoxItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { id: Key; textValue: string };
const ListBoxItemContext = React.createContext<{ isSelected: boolean } | null>(null);

function ListBoxItem({ children, className, id, textValue, onClick, ...props }: ListBoxItemProps) {
  const context = useComboBoxContext("ListBox.Item");
  const isSelected = context.selectedKey === id;
  const isDisabled = context.disabledKeys.has(id) || props.disabled;
  const isHidden = !context.shouldShowItem(textValue);

  React.useEffect(() => {
    context.registerItem(id, textValue);
    return () => context.unregisterItem(id);
  }, [context.registerItem, context.unregisterItem, id, textValue]);

  return (
    <ListBoxItemContext.Provider value={{ isSelected }}>
      <button {...props} aria-disabled={isDisabled || undefined} aria-selected={isSelected} className={cn("list-box-item", className)}
        data-disabled={isDisabled || undefined} data-highlighted={context.highlightedKey === id || undefined}
        data-key={String(id)} data-selected={isSelected || undefined} data-slot="list-box-item" data-text-value={textValue}
        hidden={isHidden} onClick={e => { onClick?.(e); if (!e.defaultPrevented) context.selectItem(id, textValue); }}
        onMouseEnter={() => context.setHighlightedKey(id)} role="option" type="button">
        {children}
      </button>
    </ListBoxItemContext.Provider>
  );
}

function ListBoxItemIndicator({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const itemContext = React.useContext(ListBoxItemContext);
  const isSelected = Boolean(itemContext?.isSelected);
  return (
    <span {...props} aria-hidden className={cn("list-box-item__indicator", className)} data-slot="list-box-item-indicator" data-visible={isSelected || undefined}>
      {children ?? <svg aria-hidden fill="none" role="presentation" stroke="currentColor" strokeDasharray={22} strokeDashoffset={isSelected ? 44 : 66} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 17 18" width={12} height={12}><polyline points="1 9 7 14 15 4" /></svg>}
    </span>
  );
}

const ComboBox = Object.assign(ComboBoxRoot, { InputGroup: ComboBoxInputGroup, Popover: ComboBoxPopover, Trigger: ComboBoxTrigger });
const ListBox = Object.assign(ListBoxRoot, { Item: ListBoxItem, ItemIndicator: ListBoxItemIndicator });

export { ComboBox, Input, ListBox };
