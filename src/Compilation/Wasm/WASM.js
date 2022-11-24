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

	memtype: 0x02,
	blocktype: 0x40,

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
	i32eq: 0x46,
	i32lt_s: 0x48, // signed less than
	i32lt_u: 0x49, // unsigned less than
	i32gt_s: 0x4A, // signed greater than
	i32gt_u: 0x4B, // unsigned greater than
	i32le_s: 0x4C, // signed less than or equal to
	i32le_u: 0x4D, // unsigned less than or equal to
	i32ge_s: 0x4E, // signed greater than or equal to
	i32ge_u: 0x4F, // unsigned greater than or equal to

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

	// memory intructions
	i32load: 0x28,
	i64load: 0x29,
	f32load: 0x2A,
	f64load: 0x2B,
	memorysize: 0x3F,
	
	block: 0x02,
	loop: 0x03,
	IF: 0x04,

	br: 0x0C,
	br_if: 0x0d,

	call: 0x10,
	call_indirect: 0x11,

	RETURN: 0x0f,

	END: 0xB,

	vector,
	toWasmType,
};

export default WASM;