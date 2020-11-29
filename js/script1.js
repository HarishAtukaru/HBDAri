RGBA(`
#define t time*.03

const float PI = 3.14159265;

float chlandi(vec2 p) {
    float N = 2.8 + sin(t*0.34231), 
          M = 1.6 + sin(t*0.49234);
    return 1.31 * sin(PI*N*p.x) * sin(PI*M*p.y) + 
           1.71 * sin(PI*M*p.x) * sin(PI*N*p.y);
}

float fbm(vec2 p) {
    vec2 T = p; 
    float tot = 0.0, sum = 0.0, amp = 2.0; 
    for (int i = 0; i < 6; i++) {
        tot += chlandi(p + T) * amp; 
        p *= 2.0+cos(t); 
        T *= 4.5+sin(t)*3.; 
        sum += amp; 
        amp *= 0.4 + sin(t)*0.05; 
    }
    return tot/sum; 
}

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - resolution) / resolution.y *22.;
    for(int i=0; i<3; i++)
        p = abs(p)/dot(p,p) - .15;

    float v = abs(fbm(p-t));
 
  
    float r = smoothstep(0.0, 0.5, v);
    float g = smoothstep(0.15, 0.85, v);
    float b = smoothstep(0.5, 1.0, v);
    gl_FragColor = vec4(r, g, b, 1.0);
}`, {
    record: false
});