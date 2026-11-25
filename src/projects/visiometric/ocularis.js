/**
 * ==========================================================================
 * Visiometric Labs — Compatibility Bridge (Ocularis -> Refraction Simulator)
 * Proporciona retrocompatibilidad transparente para referencias o scripts cacheados.
 * ==========================================================================
 */
(function () {
    const mod = (typeof window !== 'undefined' && window.REFRACTION_SIMULATOR_MODULE)
        ? window.REFRACTION_SIMULATOR_MODULE
        : (typeof require !== 'undefined' ? (function () {
            try { return require('./refraction-simulator.js'); } catch (e) { return null; }
        })() : null);

    if (typeof window !== 'undefined') {
        window.OCULARIS_MODULE = mod || window.REFRACTION_SIMULATOR_MODULE || null;
    }
    if (typeof module !== 'undefined') {
        module.exports = mod;
    }
})();
