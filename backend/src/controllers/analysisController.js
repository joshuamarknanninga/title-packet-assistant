import { Analysis, File } from '../models/index.js';

export const listAnalyses = async (req, res, next) => {
  try {
    const analyses = await Analysis.findAll({
      include: [{ model: File, attributes: ['originalName'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(analyses);
  } catch (err) {
    next(err);
  }
};

export const getAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const analysis = await Analysis.findByPk(id, {
      include: [{ model: File }]
    });
    if (!analysis) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(analysis);
  } catch (err) {
    next(err);
  }
};

export const updateRequirementsExceptions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { requirements, exceptions } = req.body;

    const analysis = await Analysis.findByPk(id);
    if (!analysis) {
      return res.status(404).json({ error: 'Not found' });
    }

    analysis.requirements = requirements ?? analysis.requirements;
    analysis.exceptions = exceptions ?? analysis.exceptions;
    await analysis.save();

    res.json(analysis);
  } catch (err) {
    next(err);
  }
};
