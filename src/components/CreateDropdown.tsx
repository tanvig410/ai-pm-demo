import React from 'react';

type CreateDropdownProps = {
  onSelect?: (value: string) => void;
  items?: Array<{ label: string; value: string }>;
  className?: string;
};

export default function CreateDropdown({
  onSelect,
  items = [
    { label: 'Techpack', value: 'techpack' },
    { label: 'Style', value: 'style' },
  ],
  className,
}: CreateDropdownProps) {
  return (
    <div className={className} style={{ display: 'inline-block', position: 'relative' }}>
      <select
        onChange={(e) => onSelect?.(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: 8 }}
        defaultValue=""
      >
        <option value="" disabled>
          Create…
        </option>
        {items.map((it) => (
          <option key={it.value} value={it.value}>
            {it.label}
          </option>
        ))}
      </select>
    </div>
  );
}
