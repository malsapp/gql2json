{
	var objects = [];
}

file
	= objects:(decl / schema)+
	{ return objects; }

schema = _ 'schema' __ '{' _ fields:fields? _ '}'
	{
		if (!fields) var fields = [];
		return {
			class:'schema',
			name: '',
			interface: '',
			fields
		}
	}

decl
	= _ d_name:decl_name _ "{" _ fields:fields? _ "}" _
	{
		if (!fields) var fields = [];
		return {
			class:d_name.type,
			name:d_name.name,
			interface:d_name.iface,
			fields
		};
	}

decl_name
	= type:decl_class __ name:identifier iface:iface? _
	{
		if (!iface) var iface = '';
		return { type, name, iface };
	}

decl_class
	= token:('type'/'interface'/'input') { return token; }

iface
	= __ 'implements' __ iface:identifier
	{
		return iface;
	}

fields = fields:field*
	{
		return fields;
	}

field 
	= _ identifier:identifier _ args:args? ':' _ field_type:field_type _
	{
		if (!args) var args = [];
		return { identifier, type:field_type.type, nonNull:field_type.nonNull, list:field_type.list, args };
	}

args = '(' _ args:arg+ _ ')'
	{
		return args;
	}

arg
	= _ identifier:identifier _ ':' _ field_type:field_type _
	{
		return { identifier, type:field_type.type, nonNull:field_type.nonNull, list:field_type.list };
	}

field_type
	= type:( identifier / "[" _? identifier _? "]" ) _ nonNull:"!"?
	{
		var list = false;

		if (!nonNull) { var nonNull = false; }
		else { nonNull = true; }

		if (typeof type === 'object') {
			list = true;
			type = type[2];
		}

		return { type, nonNull, list };
	}

identifier
	= token:([_A-Za-z][_0-9A-Za-z]*) 
	{
		if (token[1]) token[1] = token[1].join ('');
		return token.join ('');
	}

_ = [ \,\t\r\n]*
__ = [ \t\r\n]+