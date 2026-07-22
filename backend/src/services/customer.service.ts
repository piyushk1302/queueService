import customerRepository from "../repositories/customer.repository.js";
import type {
  LoginCustomerInput,
  RegisterCustomerInput,
} from "../schemas/customer.schema.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

class CustomerService {
  async register(data: RegisterCustomerInput) {
    const existingCustomer = await customerRepository.findByEmail(
      data.email
    );

    if (existingCustomer) {
      throw new Error("Customer already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const customer = await customerRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken(customer.id);

    return {
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      token,
    };
  }

  async login(data: LoginCustomerInput) {
    const customer = await customerRepository.findByEmail(
      data.email
    );

    if (!customer) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      customer.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(customer.id, "customer");

    return {
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      token,
    };
  }

  async getProfile(customerId: string) {
    const customer = await customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt,
    };
  }
}

export default new CustomerService();