export function KeyboardHints() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
      <p className="text-xs text-white" style={{ opacity: '0.8', fontSize: '12px' }}>
        / = search   •   ? = shortcuts
      </p>
    </div>
  );
}