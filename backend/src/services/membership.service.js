import Membership from "../models/membership";

class MembershipService {
  async createMembership(data) {
    try {
      const membership = new Membership(data);
      const createdMembership = await membership.save();
      return createdMembership;
    } catch (error) {
      throw error;
    }
  }

  async getMemberships() {
    try {
      const memberships = await Membership.find();
      return memberships;
    } catch (error) {
      throw error;
    }
  }
}

export default new MembershipService();
