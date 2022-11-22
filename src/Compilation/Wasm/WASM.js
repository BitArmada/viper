function vector(array){
	return [
		array.length,
		...array
	];
}

function toWasmType(type){
	switch(type){
		case 'int':
			return 'i32'
			break;
		case 'float':
			return 'f32'
			break;
	}
}

const WASM = {
	versionStatement: [
		0x00,0x61,0x73,0x6D,0x01,0x00,0x00,0x00
	],

	TYPESEC: 0x01,
	IMPORTSEC: 0x02,
	FUNCSEC: 0x03,
	EXPORTSEC: 0x07,
	CODESEC: 0x0A,

	FUNCTYPE: 0x60,

	LOCALS: 0x01,

	// number types
	i32: 0x7f,
	i64: 0x7e,
    f32: 0x7d,
	f64: 0x7c,

	// constants
	i32const: 0x41,
	i64const: 0x42,
	f32const: 0x43,
	f64const: 0x44,

	localget: 0x20,
	localset: 0x21,

	// operations
	i32add: 0x6A,
	i32sub: 0x6B,
	i32mul: 0x6C,

	i64add: 0x7C,
	i64sub: 0x7D,
	i64mul: 0x7E,

	f32add: 0x92,
	f32sub: 0x93,
	f32mul: 0x94,

	f64add: 0xA0,
	f64sub: 0xA1,
	f64mul: 0xA2,

	funcidx: 0x00,
	tableidx: 0x01,
	memidx: 0x02,
    globalidx: 0x03,

	call: 0x10,
	call_indirect: 0x11,

	RETURN: 0x0f,

	END: 0xB,

	vector,
	toWasmType,
};

export default WASM;