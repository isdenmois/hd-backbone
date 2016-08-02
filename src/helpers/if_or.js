/**
 * Helper for two or condition.
 * Usage: {{#if_or cond1 cond2}}{{/if_or}}
 */
export default function (v1, v2, options) {
    if (v1 || v2) {
        return options.fn(this);
    }
    return options.inverse(this);
}
