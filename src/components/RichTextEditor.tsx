import { useMemo, useState, useCallback } from "react";
import { createEditor, type Descendant, Editor } from "slate";
import { Slate, Editable, withReact, useSlateStatic } from "slate-react";
import type { RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import { Bold, Italic, Underline } from "lucide-react";
import { cn } from "@/lib/utils";
import { deserialize, serialize } from "@/lib/slate-utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  resetKey?: string;
  initialContent?: string;
}

function isMarkActive(editor: Editor, format: string): boolean {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
}

function toggleMark(editor: Editor, format: string): void {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function MarkButton({
  format,
  icon: Icon,
  label,
}: {
  format: string;
  icon: typeof Bold;
  label: string;
}) {
  const editor = useSlateStatic();

  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "p-1.5 rounded hover:bg-muted cursor-pointer",
        isMarkActive(editor, format) && "bg-muted text-primary"
      )}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-input">
      <MarkButton format="bold" icon={Bold} label="Bold" />
      <MarkButton format="italic" icon={Italic} label="Italic" />
      <MarkButton format="underline" icon={Underline} label="Underline" />
    </div>
  );
}

function RichTextEditor({
  value,
  onChange,
  onBlur,
  id,
  name,
  className,
  placeholder = "Write something...",
  readOnly = false,
  resetKey,
  initialContent,
}: Props) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [initialValue] = useState(() => deserialize(initialContent ?? value));

  const handleChange = useCallback(
    (nodes: Descendant[]) => {
      onChange(serialize(nodes));
    },
    [onChange]
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      let el = <>{children}</>;
      if (leaf.bold) el = <strong>{el}</strong>;
      if (leaf.italic) el = <em>{el}</em>;
      if (leaf.underline) el = <u>{el}</u>;
      return <span {...attributes}>{el}</span>;
    },
    []
  );

  return (
    <div
      className={cn(
        "rounded-md border border-input bg-transparent transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        readOnly && "border-0 bg-transparent focus-within:ring-0 focus-within:border-0",
        className
      )}
    >
      <Slate
        key={resetKey}
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}
      >
        {!readOnly && <Toolbar />}
        <div className={cn(!readOnly && "px-3 pb-2")}>
          <Editable
            id={id}
            name={name}
            readOnly={readOnly}
            placeholder={placeholder}
            onBlur={onBlur}
            renderLeaf={renderLeaf}
            className={cn(
              "min-h-16 w-full outline-none md:text-sm break-words",
              !readOnly && "h-[200px] overflow-y-auto",
              readOnly
                ? "px-0 py-2 text-sm leading-relaxed"
                : "px-3 py-2 text-base placeholder:text-muted-foreground"
            )}
          />
        </div>
      </Slate>
    </div>
  );
}

export default RichTextEditor;
