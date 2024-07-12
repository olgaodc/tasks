import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
  serviceName: {
    type: String, required: true, unique: true, minlength: 3,
  },
  imageUrl: { type: String, required: true, minlength: 10 },
  bgColor: { type: String, required: true, match: /^\d{6}$/ },
  creationDate: { type: Date, required: true },
});

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;
