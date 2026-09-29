# Modelos de referencia 9:16 — cómo debe reproducirse una pieza vertical

_Propuesta de CC para validar con Sam (2026-09-29). Nace de su decisión: «9:16 … lo vas a hacer como
queremos que se reproduzcan las piezas, de hecho deberías crear varias»._

**Qué son:** esquemas (no fotos) que fijan **dónde va cada cosa** en un vertical 1080 × 1920. El
sujeto no tiene que ser siempre la misma persona ni una sola persona; el producto no tiene que ser
siempre uno ni un kit completo; y puede haber pieza sin persona o sin producto.

**Qué NO son:** todavía no son dato. Cuando Sam los valide, se vuelven un **catálogo de layouts**
(dato por marca) que ImageLab y el compositor leen en la sesión de ImageLab. Hasta entonces nada
del carril los usa.

## La identidad visual que ya pintan (medida en `public.imagelab_overlay_tokens`, NeuroneSCF)
- **Franja de identidad** a la izquierda, 1,8 % del ancho, color `accent_warm` (#C4622D).
- **Filete** bajo el titular: 12 % del ancho, 4 px, mismo color.
- **Velo** en degradado desde el borde del texto, `primary` (#000000) al 84 %, 60 % de cobertura.
- **Texto** en `neutral` (#FAFAFA): titular en PT Sans Narrow Bold y apoyo en Montserrat (en los
  esquemas se dibujan con una sans genérica; son posiciones, no tipografía final).
- Margen 7 %, ancho máximo del texto 76 %.

Los colores y las fuentes son **de la marca** (dato); los esquemas sirven a cualquier marca con sus
propios tokens.

## Zonas de interfaz (rojo en los esquemas)
En Reels, Stories y TikTok la interfaz tapa el **14 % superior**, el **20 % inferior** y el **carril
derecho** (iconos) entre el 40 % y el 80 % de la altura. **Ni texto ni producto van ahí.**

## Los seis modelos

| Modelo | Sujeto | Producto | Texto |
|---|---|---|---|
| **M1** | 1 persona, plano medio | 1, en la mano, del lado contrario al texto | abajo a la izquierda, sobre la zona de interfaz inferior |
| **M2** | 2 personas (profesional + clienta) | 1, sobre una superficie | abajo a la izquierda |
| **M3** | ninguno: el producto es el sujeto | 1 héroe, a tamaño real sobre su superficie | arriba a la izquierda, con velo superior |
| **M4** | una mano o un gesto | 2–3 productos (kit parcial), nunca el kit entero en una mano | arriba a la izquierda |
| **M5** | 1 persona, retrato con la mirada a cámara | ninguno | abajo, con apoyo opcional |
| **M6** | escena desenfocada | 1 pequeño, opcional | frase centrada |

Archivos: `M1_9x16.png` … `M6_9x16.png` y `hoja_de_contacto_9x16.png`.

## Lo que falta para que sean dato (sesión de ImageLab)
1. **Validación de Sam** de cada modelo: cuáles quedan, cuáles cambian, cuáles faltan.
2. **Catálogo de layouts** por marca y formato (qué modelos admite, con qué frecuencia), con las
   cajas en porcentaje (sujeto, producto, texto) y el anclaje del texto.
3. **ImageLab**: el constructor de prompt recibe el modelo elegido y describe el encuadre con él; el
   compositor ancla el texto donde el modelo dice y respeta las zonas de interfaz.
4. **Prueba**: una pieza por modelo, revisada antes de pasar a producción.
