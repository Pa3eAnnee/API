import Joi from "joi";

export interface CreateAddressRequest {
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	num: number;
	timezone: string;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
	id: number;
}

export const createAddressValidation = Joi.object<CreateAddressRequest>({
	street: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	zip: Joi.string().required(),
	country: Joi.string().required(),
	num: Joi.number().required(),
	timezone: Joi.string().required(),
});

export const updateAddressValidation = Joi.object<UpdateAddressRequest>({
	id: Joi.number().required(),
	street: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	zip: Joi.string().required(),
	country: Joi.string().required(),
	num: Joi.number().required(),
	timezone: Joi.string().required(),
});
