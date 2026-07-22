import prisma from "../config/prisma.js";
import type { RegisterCustomerInput } from "../schemas/customer.schema.js";

class CustomerRepository {
  async findByEmail(email: string) {
    return prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: RegisterCustomerInput) {
    return prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
    });
  }
}

export default new CustomerRepository();