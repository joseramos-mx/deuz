import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { alcance, siguientesPasos, VALIDEZ_DIAS, getTipo, especificaciones, etapas, inicios } from "@/data/cotizador";
import { leyenda } from "@/lib/cotizacion";
import { fmtMXN, fmtMagnitud } from "@/lib/formato";

const ROJO = "#E50914";
const GRIS = "#6B6B6B";
const LINEA = "#E5E5E5";

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, fontFamily: "Helvetica", color: "#111111" },
  header: { backgroundColor: ROJO, color: "#FFFFFF", padding: 22, marginBottom: 12 },
  marca: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: 1 },
  titulo: { fontSize: 16, marginTop: 14 },
  folio: { fontSize: 9, marginTop: 6, letterSpacing: 1 },
  h2: { fontSize: 9, fontFamily: "Helvetica-Bold", color: ROJO, letterSpacing: 1, marginBottom: 6, marginTop: 14 },
  fila: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: LINEA, paddingVertical: 4 },
  k: { width: "38%", color: GRIS },
  v: { width: "62%" },
  cifras: { flexDirection: "row", gap: 12 },
  cifra: { flex: 1, borderWidth: 1, borderColor: LINEA, padding: 12 },
  cifraK: { fontSize: 8, color: GRIS, letterSpacing: 1 },
  cifraV: { fontSize: 15, marginTop: 6, fontFamily: "Helvetica-Bold" },
  cols: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  item: { marginBottom: 3 },
  leyenda: { marginTop: 16, fontSize: 8, color: GRIS, lineHeight: 1.4 },
});

function Fila({ k, v }) {
  if (!v) return null;
  return (
    <View style={s.fila}>
      <Text style={s.k}>{k}</Text>
      <Text style={s.v}>{v}</Text>
    </View>
  );
}

export default function PrePropuesta({ folio, datos, estimacion, fecha = new Date() }) {
  const validez = new Date(fecha.getTime() + VALIDEZ_DIAS * 864e5);
  const fmtFecha = (d) => d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const label = (arr, id) => arr.find((o) => o.id === id)?.label;

  return (
    <Document title={`Pre-propuesta ${folio}`} author="DEUZ Grupo Empresarial">
      <Page size="LETTER" style={s.page}>
        <View style={s.header}>
          <Text style={s.marca}>DEUZ</Text>
          <Text style={s.titulo}>Pre-propuesta de obra</Text>
          <Text style={s.folio}>
            FOLIO {folio} · {fmtFecha(fecha).toUpperCase()} · VÁLIDA HASTA {fmtFecha(validez).toUpperCase()}
          </Text>
        </View>

        <Text style={s.h2}>DATOS DEL PROYECTO</Text>
        <Fila k="Cliente" v={`${datos.nombre}, ${datos.cargo}`} />
        <Fila k="Empresa" v={datos.empresa} />
        <Fila k="Tipo de obra" v={getTipo(datos.tipo).label} />
        <Fila k="Ubicación" v={`${datos.municipio}, ${datos.estado}`} />
        <Fila k="Magnitud" v={fmtMagnitud(estimacion.magnitud) ?? datos.descripcion} />
        <Fila k="Especificación" v={label(especificaciones, datos.especificacion)} />
        <Fila k="Etapa" v={label(etapas, datos.etapa)} />
        <Fila k="Inicio deseado" v={label(inicios, datos.inicio)} />

        <Text style={s.h2}>ESTIMACIÓN PRELIMINAR</Text>
        <View style={s.cifras}>
          <View style={s.cifra}>
            <Text style={s.cifraK}>RANGO DE INVERSIÓN</Text>
            <Text style={s.cifraV}>
              {estimacion.montos
                ? `${fmtMXN(estimacion.montos.min)} a ${fmtMXN(estimacion.montos.max)}`
                : "Se define en visita técnica"}
            </Text>
          </View>
          <View style={s.cifra}>
            <Text style={s.cifraK}>PLAZO ESTIMADO</Text>
            <Text style={s.cifraV}>
              {estimacion.plazo ? `${estimacion.plazo.min} a ${estimacion.plazo.max} semanas` : "Se define en visita técnica"}
            </Text>
          </View>
        </View>

        <View style={s.cols}>
          <View style={s.col}>
            <Text style={s.h2}>INCLUYE</Text>
            {alcance.incluye.map((t) => (
              <Text key={t} style={s.item}>• {t}</Text>
            ))}
          </View>
          <View style={s.col}>
            <Text style={s.h2}>NO INCLUYE</Text>
            {alcance.noIncluye.map((t) => (
              <Text key={t} style={s.item}>• {t}</Text>
            ))}
          </View>
        </View>

        <Text style={s.h2}>SIGUIENTES PASOS</Text>
        {siguientesPasos.map((p, i) => (
          <Fila key={p.paso} k={`${i + 1}. ${p.paso}`} v={p.plazo} />
        ))}

        <Text style={s.leyenda}>
          {leyenda()} Este documento no constituye una oferta vinculante ni un contrato. Vigencia de {VALIDEZ_DIAS} días
          naturales a partir de su emisión.
        </Text>
      </Page>
    </Document>
  );
}
