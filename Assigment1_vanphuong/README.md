#Name: Van Phuong
#COS 452
#Assigment1
#09/19/2015


I found this 3D Flame  at https://www.shadertoy.com/view/MdX3zr
 I like the animation, and how realistic flame looks.  I like the way that the author designed how the flame glows. The flame displayed multiple colors, ranging from blue to orange yellow. I analyzed the source code and was able to understand the snippets of the source code.  The following snippets of code were taken from the source code. 

float noise(vec3 p) //Thx to Las^Mercury
{
	vec3 i = floor(p);
	vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
	vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
	a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
	a.xy = mix(a.xz, a.yw, f.y);
	return mix(a.x, a.y, f.z);
}
The noise function controls the texture of background of the flame. The following function “a.xy = mix(a.xz, a.yw, f.y);” controls the vertical and the horizontal of the object flame, by manipulating the x or y. 

The code snippet below defines a global time of the flame, which dictates the rate of animated flame. The code also defines the noise background texture. 
float flame(vec3 p)
{
	float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,2.));
	return d + (noise(p+vec3(.0,iGlobalTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y) ;
}



