const resetColor = "\x1b[0m"; // Reset color

const startHue = 0; // Start hue (0-360)
const endHue = 360; // End hue (0-360)
const hueSteps = 100; // Number of steps
const startSaturation = 100; // Start saturation (0-100)
const endSaturation = 100; // End saturation (0-100)
const saturationSteps = 1; // Number of steps
const startLightness = 30; // Start lightness (0-100)
const endLightness = 70; // End lightness (0-100)
const lightnessSteps = 10; // Number of steps
const letter = 'X'
let text = "";

for (let k = 0; k < lightnessSteps; k++) {
    const lightness = (lightnessSteps === 1)
        ? startLightness
        : startLightness + ((endLightness - startLightness) * k) / (lightnessSteps - 1);
    for (let j = 0; j < saturationSteps; j++) {
        const saturation = (saturationSteps === 1)
            ? startSaturation
            : startSaturation + ((endSaturation - startSaturation) * j) / (saturationSteps - 1);
        for (let i = 0; i < hueSteps; i++) {
            const hue = ((hueSteps === 1)
                ? startHue
                : startHue + ((endHue - startHue) * i) / (hueSteps - 1)) % 360;
        
            const color = hslToRgb(hue, saturation, lightness);
            text += `\x1b[38;2;${color[0]};${color[1]};${color[2]}m` + letter + resetColor;
        }
        text += "\n";
    }
}
console.log(text);



function generateSteps(start, end, n) {
    // start and end are objects: {h, s, l}
    if (n === 1) return [start];
    let steps = [];
    for (let i = 0; i < n; i++) {
        let h = start.h + ((end.h - start.h) * i) / (n - 1);
        let s = start.s + ((end.s - start.s) * i) / (n - 1);
        let l = start.l + ((end.l - start.l) * i) / (n - 1);
        steps.push({ h, s, l });
    }
    return steps;
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
    ];
}