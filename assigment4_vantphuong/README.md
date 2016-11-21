##COS452
##Van Phuong
##Assignment 4
## 11/21/2014

##Part I :
*  The implementation of the fireball demo implemented using the simplex noise function-which is a successor to the Perlin noise. The demo in question displays smooth noise patterns, which mimics the fluidity of fires. Frequency and wavelengths play a large role in defining the shapes/patterns of the fire. In general, lower frequencies mean wider waves and vice versa, higher frequencies equate to narrower wavelengths.  Manipulating the frequencies and the amplitudes of the functions may change Perlin noise functions characteristics.  A noise function, an interpolation function, and a smooth function are required to create the Perlin noise function.
*  Noise Function is used to generate the texture/background, utilizing general random number generators. Fractal features use same noise function to iterate same patterns of large and small variations. 

*  The animation on the sphere implemented using fragment shader and vertex shader.
Vertex Shader takes the attribute(a parameter for a vertex) vec3 and passes it to the fragment shader using a uniform( a parameter that can be shared between vertex shader and fragment shader). The time factor is added to the noise parameters in vertex shader, so it moves with time. 
Fragment shader implemented simplex implementations. Generation of texture, calculating gradients are done in fragment shader.Fragment shader determined diffuse light and specular light based on the hight. Finally , animation is accomplished by rotating the mesh patterns in with respect to the X and Y-axis. 

##Part II: 

###[Assignment4 Video](https://youtu.be/0k1NMObt2DA)
	

###Part III: 
Group project 
###Srinivasan Natarajan
###Daniel Dusabimana
###Van Phuong 
