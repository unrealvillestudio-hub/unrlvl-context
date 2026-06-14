"""
NSCF-PRICING — Motor de cálculo B2B/B2C para NeuroneSCF
Fuente de verdad: RES-Neurone_Pricing_v17_B2B_B2C.xlsx (Sam la sube cada sesión).
REGLA: el xlsx NO se altera salvo que Sam lo pida. La columna O (Precio en Shopify)
       es precio de lista PO+Sam: se toma como ancla, nunca se recalcula.

Fórmulas verificadas contra el archivo (fila 6 de cada catálogo):
  Precio c/Arancel  = Compra_LATAM * 1.20
  Costo Total Real B2C = Compra*1.20 + LOGISTICA + TRANSACCION + MARKETING + OPERATIVOS
  Costo Total Real B2B = Compra*1.20 + TRANSACCION + OPERATIVOS
  Precio MÍNIMO  = Costo / 0.6   (margen 40%)
  Precio DESEADO = Costo / 0.5   (margen 50%)
  Precio ÓPTIMO  = Costo / 0.4   (margen 60%)
"""
from dataclasses import dataclass, field
from typing import Optional
import openpyxl

ARANCEL = 1.20
# Overheads — se LEEN del archivo en runtime (no hardcode); estos son fallback verificados.
OVERHEAD_B2C_FALLBACK = 23.5951   # LOG 14.2565 + TR 0.9744 + MK 6.7399 + OP 1.6243
OVERHEAD_B2B_FALLBACK = 2.5987    # TR 0.9744 + OP 1.6243

MARGIN_FACTORS = {"MIN": 0.6, "DES": 0.5, "OPT": 0.4}   # costo / factor
MARGIN_PCT     = {"MIN": 0.40, "DES": 0.50, "OPT": 0.60}

def read_overheads(xlsx_path):
    """Lee los overheads reales desde las hojas de costos del archivo fuente."""
    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    def cell(sheet, r, c): return wb[sheet].cell(row=r, column=c).value or 0
    log = cell('LOGISTICA', 17, 5)
    tr  = cell('TRANSACCION', 15, 5)
    mk  = cell('MARKETING', 25, 5)
    op  = cell('OPERATIVOS', 19, 5)
    return {
        'B2C': log + tr + mk + op,
        'B2B': tr + op,
        'detail': {'LOGISTICA': log, 'TRANSACCION': tr, 'MARKETING': mk, 'OPERATIVOS': op},
    }

def costo_total_real(compra_latam, canal, overheads):
    return compra_latam * ARANCEL + overheads[canal]

def precios_3(costo):
    return {k: costo / f for k, f in MARGIN_FACTORS.items()}

@dataclass
class Producto:
    nombre: str
    compra_latam: float
    canal: str = 'B2B'          # canal de COSTO a aplicar (B2B normalmente)
    presentacion: str = ''
    pvp_lista: Optional[float] = None   # columna O — ancla, no se recalcula
    sku: str = ''
    cantidad: float = 1
    fuente: str = ''

    def costo(self, ov):  return costo_total_real(self.compra_latam, self.canal, ov)
    def precios(self, ov): return precios_3(self.costo(ov))

@dataclass
class Kit:
    nombre: str
    items: list = field(default_factory=list)

    def costo_total(self, ov):
        return sum(p.costo(ov) * p.cantidad for p in self.items)

    def suma_pvp(self, ov):
        # Si un ítem no tiene PVP de lista, usa su precio DESEADO como proxy
        s = 0
        for p in self.items:
            pv = p.pvp_lista if p.pvp_lista else p.precios(ov)['DES']
            s += pv * p.cantidad
        return s

    def vista_suma_items(self, ov, margen='DES'):
        """Vista 1: suma de cada ítem a su precio de margen."""
        total = sum(p.precios(ov)[margen] * p.cantidad for p in self.items)
        costo = self.costo_total(ov)
        return {'precio': total, 'costo': costo, 'utilidad': total-costo,
                'margen': (total-costo)/total if total else 0}

    def vista_margen_kit(self, ov, margen='DES'):
        """Vista 2: precio del kit a un margen objetivo sobre el costo total."""
        costo = self.costo_total(ov)
        precio = costo / MARGIN_FACTORS[margen]
        return {'precio': precio, 'costo': costo, 'utilidad': precio-costo,
                'margen': (precio-costo)/precio if precio else 0}

    def vista_descuento_pvp(self, ov, descuento):
        """Vista 3: descuento sobre la suma de PVP de lista (estilo Alizzanti)."""
        base = self.suma_pvp(ov)
        precio = base * (1 - descuento)
        costo = self.costo_total(ov)
        return {'precio': precio, 'costo': costo, 'utilidad': precio-costo,
                'pvp_base': base, 'descuento': descuento,
                'margen': (precio-costo)/precio if precio else 0}

if __name__ == '__main__':
    print("NSCF-PRICING engine — verificación de fórmulas")
    ov = {'B2C': OVERHEAD_B2C_FALLBACK, 'B2B': OVERHEAD_B2B_FALLBACK}
    # check Humit Mask
    print("B2C Humit Mask (compra 5.3):", round(costo_total_real(5.3,'B2C',ov),4), "→ esperado 29.9551")
    print("B2B Humit Mask (compra 9.5):", round(costo_total_real(9.5,'B2B',ov),4), "→ esperado 13.9987")
