uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec2 direction = uv - uMouse;
    float dist = length(direction);

    // Smooth falloff around the mouse
    float falloff = exp(-dist * 8.0);

    // Gentle moving liquid waves
    float wave = sin(dist * 44.0 - uTime * 3.5);

    // Smooth distortion strength
    float strength =
        wave *
        falloff *
        0.045 *
        uHover;

    // Avoid unstable direction near the mouse
    vec2 safeDirection = direction / max(dist, 0.001);

    uv += safeDirection * strength;

    gl_FragColor = texture2D(uTexture, uv);
}