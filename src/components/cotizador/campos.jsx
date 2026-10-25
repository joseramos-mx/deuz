import { cn } from "@/lib/utils";

/** Grupo de opciones como tarjetas seleccionables (radios nativos: flechas y Tab funcionan). */
export function Opciones({ name, legend, opciones, value, onChange, cols = "sm:grid-cols-2 lg:grid-cols-3", error }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-deuz-text">{legend}</legend>
      <div className={cn("mt-3 grid gap-2", cols)}>
        {opciones.map((o) => (
          <label key={o.id} className="group relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-full flex-col justify-center gap-1 border border-deuz-line bg-deuz-elev px-4 py-3 text-sm text-deuz-text transition-colors",
                "group-hover:border-deuz-line-strong peer-checked:border-deuz-red peer-checked:bg-deuz-red/10",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2 shrink-0 border border-deuz-line-strong group-has-[:checked]:border-deuz-red group-has-[:checked]:bg-deuz-red"
                />
                {o.label}
              </span>
              {o.detalle && <span className="pl-4 text-xs text-deuz-muted">{o.detalle}</span>}
            </span>
          </label>
        ))}
      </div>
      <Error msg={error} />
    </fieldset>
  );
}

const inputCls =
  "mt-2 block h-11 w-full rounded-none border border-deuz-line bg-deuz-elev px-3 text-[16px] text-deuz-text placeholder:text-deuz-dim transition-colors hover:border-deuz-line-strong focus:border-deuz-red focus:outline-none";

export function Campo({ id, label, error, hint, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-deuz-text">
        {label}
      </label>
      <input id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={inputCls} {...props} />
      {hint && !error && <p className="mt-1.5 text-xs text-deuz-dim">{hint}</p>}
      <Error id={`${id}-err`} msg={error} />
    </div>
  );
}

export function Selector({ id, label, error, opciones, placeholder, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-deuz-text">
        {label}
      </label>
      <select id={id} name={id} aria-invalid={!!error} className={cn(inputCls, "appearance-none")} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {opciones.map((o) => (
          <option key={o.id ?? o} value={o.id ?? o} className="bg-deuz-elev">
            {o.label ?? o}
          </option>
        ))}
      </select>
      <Error msg={error} />
    </div>
  );
}

export function AreaTexto({ id, label, error, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-deuz-text">
        {label}
      </label>
      <textarea id={id} name={id} rows={4} aria-invalid={!!error} className={cn(inputCls, "h-auto py-2.5")} {...props} />
      <Error msg={error} />
    </div>
  );
}

export function Error({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-[#FF6B6B]">
      {msg}
    </p>
  );
}
