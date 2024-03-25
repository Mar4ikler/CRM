/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const processPromises = async (promises: any): Promise<any[]> => {
    const results = await Promise.allSettled(promises);
    const values = [];
    results.forEach((result) => {
        if (result.status === 'fulfilled') values.push(result.value);
        else throw new Error(result.reason);
    });

    return values;
};
